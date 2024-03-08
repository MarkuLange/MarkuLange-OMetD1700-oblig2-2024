package com.example.d1700oblig2;

public class Ticket {
    String fName;
    String lName;
    String eMail;
    String tlfNr;
    String movie;
    String amount;


    public Ticket(String fName, String lName, String eMail, String tlfNr, String movie, String amount) {
        this.fName = fName;
        this.lName = lName;
        this.eMail = eMail;
        this.tlfNr = tlfNr;
        this.movie = movie;
        this.amount = amount;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public String getTlfNr() {
        return tlfNr;
    }

    public void setTlfNr(String tlfNr) {
        this.tlfNr = tlfNr;
    }

    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
