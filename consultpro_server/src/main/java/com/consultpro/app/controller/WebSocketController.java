package com.consultpro.app.controller;

/**
 * @author : Kanchana Kalansooriya
 * @since 1/30/2025
 */
import com.consultpro.app.service.UserService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "*")
public class WebSocketController {
    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;

    public WebSocketController(SimpMessagingTemplate messagingTemplate, UserService userService) {
        this.messagingTemplate = messagingTemplate;
        this.userService = userService;
    }

    public void sendAppointmentUpdate(Long counselorId, Long clientId) {
        System.out.println("Sending message to counselor :"+"/topic/appointments/"+counselorId);
        messagingTemplate.convertAndSend("/topic/appointments/"+counselorId, "New appointment booked by "+userService.getUserById(clientId).getUsername());
    }
}