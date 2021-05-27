import csv
import smtplib
import codecs
from django.conf import settings
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage


def read_html(html_file):
    f = codecs.open(html_file, 'r', encoding='UTF-8')
    return f.read()


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


def send_newsletter(receivers):
    # Send with template
    s = init(settings.CONFIG['NEWSLETTER']['email'], settings.CONFIG['NEWSLETTER']['password'])
    for receiver in receivers:
        send_mail(s, settings.CONFIG['NEWSLETTER']['sender'], receiver.email, settings.CONFIG['NEWSLETTER']['subject'], settings.CONFIG['NEWSLETTER']['html_file'], settings.CONFIG['NEWSLETTER']['images'])
    s.quit()
