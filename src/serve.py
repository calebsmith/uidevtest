#!/usr/bin/python
import SimpleHTTPServer
import SocketServer

PORT = 8000


def main():
    print "serving at port", PORT
    Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
    httpd = SocketServer.TCPServer(("", PORT), Handler)
    httpd.serve_forever()

if __name__ == '__main__':
    main()
