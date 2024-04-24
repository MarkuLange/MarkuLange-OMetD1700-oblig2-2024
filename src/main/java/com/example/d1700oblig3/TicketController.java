package com.example.d1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Allow origin where JS is running
@CrossOrigin(origins = "http://localhost:63342")
@RestController
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping("/showTicket")
    public List<Ticket> showTickets() {
        return ticketRepository.findAll(Sort.by(Sort.Direction.DESC, "lName"));
    }

    @PostMapping ("/registerTicket")
    public ResponseEntity<String> registerTicket(@RequestBody Ticket ticket) {
        ticketRepository.save(ticket);

        return ResponseEntity.ok("Ticket successfully registered!");
    }

    @DeleteMapping("/clearTickets")
    public ResponseEntity<String> clearTickets() {
        ticketRepository.deleteAll();
        return ResponseEntity.ok("Tickets cleared!");
    }
}
