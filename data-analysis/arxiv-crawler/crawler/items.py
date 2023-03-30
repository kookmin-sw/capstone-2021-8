# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class PaperItem(scrapy.Item):
    title = scrapy.Field()
    authors = scrapy.Field()
    arxiv_num = scrapy.Field()
    publication_date = scrapy.Field()
    primary_subject = scrapy.Field()
    secondary_subjects = scrapy.Field()
    pdf_url = scrapy.Field()
    save_path = scrapy.Field()
    abstract = scrapy.Field()

    def __repr__(self):
        return repr({"title": self['title']})