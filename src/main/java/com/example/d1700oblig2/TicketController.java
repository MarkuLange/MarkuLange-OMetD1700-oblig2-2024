package com.example.d1700oblig2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
public class TicketController {

    ArrayList<Ticket> ticketArr = new ArrayList<>();

    @GetMapping("/showTicket")
    public ArrayList<Ticket> showTickets() {
        return ticketArr;
    }

    @PostMapping ("/registerTicket")
    public ResponseEntity<String> registerTicket(@RequestBody TicketInfo ticketInfo){

        Ticket ticket = new Ticket(ticketInfo.getfName(), ticketInfo.getlName(),
                ticketInfo.geteMail(), ticketInfo.getTlfNr(), ticketInfo.getMovie(), ticketInfo.getAmount());
        ticketArr.add(ticket);
        return ResponseEntity.ok("Ticket successfully registered!");
    }

    @DeleteMapping("/clearTickets")
    public ResponseEntity<String> clearTickets() {
        ticketArr.clear();
        return ResponseEntity.ok("Tickets cleared!");
    }
}
