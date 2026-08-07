from html.parser import HTMLParser
class Checker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.errors=[]
    def error(self, message):
        self.errors.append(message)
with open('index.html','r',encoding='utf8') as f:
    data=f.read()
parser=Checker()
parser.feed(data)
parser.close()
print('parse-ok')
if parser.errors:
    print('errors:')
    for e in parser.errors:
        print(e)
