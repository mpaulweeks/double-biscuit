package main

import (
	"flag"
	"io"
	"log"
	"net/http"
)

var addr = flag.String("addr", ":5080", "http service address")

func serveExample(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", 405)
		return
	}
	http.ServeFile(w, r, "home.html")
}

func serveRoot(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/health", http.StatusFound)
}

func serveHealth(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "ok")
}

func main() {
	flag.Parse()
	hub := newHub()
	go hub.run()
	http.HandleFunc("/example", serveExample)
	http.HandleFunc("/", serveRoot)
	http.HandleFunc("/health", serveHealth)
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
