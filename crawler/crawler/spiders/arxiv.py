import scrapy
import os
import json
import requests
import datetime as dt

from ..items import PaperItem

class ArxivSpider(scrapy.Spider):
    name = 'arxiv'
    allowed_domains = ['arxiv.org/']
    start_urls = ['https://arxiv.org/']

    def __init__(self, *args, **kwargs):
        super(ArxivSpider, self).__init__(*args, **kwargs)
        self.get_config()


    def get_config(self):
        with open('./crawler/config.json', 'r') as f:
            config = json.load(f)

        self.test = config['ARXIV']['TEST']
        self.base_url = config['ARXIV']['BASE_URL']
        self.curr_date = dt.date(config['ARXIV']['START_YEAR'],
                                 config['ARXIV']['START_MONTH'],
                                 config['ARXIV']['START_DAY'])
        self.end_date = dt.date(config['ARXIV']['END_YEAR'],
                                config['ARXIV']['END_MONTH'],
                                config['ARXIV']['END_DAY']) + dt.timedelta(days=1)
        if self.test:  # test for one day
            self.curr_date = dt.date.today() - dt.timedelta(days=2)
            self.end_date = dt.date.today() - dt.timedelta(days=1)
        self.base_save_path = config['ARXIV']['BASE_SAVE_PATH']


    def start_requests(self):
        request_list = []
        while self.curr_date != self.end_date:
            url = self.base_url.format(self.curr_date.month,
                                            self.curr_date.day,
                                            self.curr_date.year)
            request_list.append(scrapy.Request(url=url,
                                               callback=self.parse,
                                               cb_kwargs={
                                                   'year': self.curr_date.year,
                                                   'month': self.curr_date.month,
                                                   'day': self.curr_date.day
                                               }))
            self.curr_date += dt.timedelta(days=1)
        return request_list


    def check_folder_exist(self, path):
        curr_path = ''
        for i in path:
            curr_path += str(i) + '/'
            if not os.path.isdir(curr_path):
                os.mkdir(curr_path)


    def parse(self, response, year, month, day):
        # get infos
        paper_list = response.css('#dlpage > dl')[0]
        titles = paper_list.css('dd > div > div.list-title.mathjax::text').getall()
        titles = [i.strip() for i in titles if i != '\n']
        authors = paper_list.css('dd > div > div.list-authors')
        authors = [i.css('a::text').getall() for i in authors]
        arxiv_nums = paper_list.css('dt > span > a:nth-child(1)::text').getall()
        publication_dates = [i.replace('/', ':').split(':')[-1][:4] for i in arxiv_nums]
        primary_subject = paper_list.css('dd > div > div.list-subjects > span.primary-subject::text').getall()
        secondary_subjects = paper_list.css('dd > div > div.list-subjects::text').getall()
        secondary_subjects = [[j.strip() for j in i.split(';') if j != ''] if i != '\n\n' else []
                              for i in secondary_subjects[2::3]]
        pdf_urls = paper_list.css('dt > span > a:nth-child(2)::attr(href)').getall()
        pdf_urls = ['https://arxiv.org{}'.format(i) for i in pdf_urls]

        # check folders exist or create
        self.check_folder_exist([self.base_save_path, year, month, day])
        save_path = '{}/{}/{}/{}/'.format(self.base_save_path, year, month, day)

        # save the paper info as an item
        for idx in range(len(titles)):
            paper_item = PaperItem()
            paper_item['title'] = titles[idx]
            paper_item['authors'] = authors[idx]
            paper_item['arxiv_num'] = arxiv_nums[idx]
            paper_item['publication_date'] = publication_dates[idx]
            paper_item['primary_subject'] = primary_subject[idx]
            paper_item['secondary_subjects'] = secondary_subjects[idx]
            paper_item['pdf_url'] = pdf_urls[idx]
            paper_save_path = '{}{}{}'.format(save_path, arxiv_nums[idx].replace(':', '/').split('/')[-1], '.pdf')
            paper_item['save_path'] = paper_save_path

            # save the pdf to local folder
            pdf_response = requests.get(pdf_urls[idx])
            with open(paper_save_path, 'wb') as f:
                f.write(pdf_response.content)

            yield paper_item
