import json
import csv
import smtplib
import codecs
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage


def read_html(html_file):
    f = codecs.open(html_file, 'r', encoding='UTF-8')
    return f.read()


def get_receivers():
    f = open('receivers.csv', 'r', encoding='utf-8')
    rdr = csv.reader(f)

    receivers = []
    for line in rdr:
        receivers.append(line['email'])

    f.close()
    return receivers


def send_mail(s, sender, receiver, subject, html_file, images):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = receiver

    content = MIMEText(read_html(html_file), 'html')
    msg.attach(content)

    for image_name, image_id in images:
        image_file = open(image_name, 'rb')
        image_msg = MIMEImage(image_file.read())
        image_file.close()

        image_msg.add_header('Content-ID', '<{}>'.format(image_id))

        msg.attach(image_msg)

    s.sendmail(sender, receiver, msg.as_string())


def init(email, password):
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login(email, password)
    return s


# Read config
with open('./config.json', 'r', encoding='UTF-8') as config_file:
    config = json.load(config_file)

# Get receivers
with open('./receivers.txt', 'r', encoding='UTF-8') as receiver_file:
    receivers = receiver_file.readlines()
receivers = [receiver.replace('\n', '') for receiver in receivers]

# Send with template
s = init(config['email'], config['password'])
for receiver in receivers:
    send_mail(s, config['sender'], receiver, config['subject'], config['html_file'], config['images'])
s.quit()
