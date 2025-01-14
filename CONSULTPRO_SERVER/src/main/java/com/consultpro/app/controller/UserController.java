package com.consultpro.app.controller;


import com.consultpro.app.dto.*;
import com.consultpro.app.entity.Counselor;
import com.consultpro.app.entity.User;
import com.consultpro.app.enums.ROLE;
import com.consultpro.app.service.EmailService;
import com.consultpro.app.service.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Kanchana_m
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResDTO>authenticateUser(@RequestBody AuthenticationReqDTO request) {
        return ResponseEntity.ok(userService.authenticateUser(request));
    }
    @GetMapping("/get_users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/get-users-by-role")
    public List<User> getUsersByRole(@RequestParam ROLE role) {
        return userService.getUsersByRole(role);
    }
    @PostMapping("/create-user")
    public  ResponseEntity<AuthenticationResDTO> createUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.createUser(userDTO));
    }
    @PutMapping("/update-user")
    public ResponseEntity<User> updateUser(@RequestParam Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @DeleteMapping("/delete-user")
    public ResponseEntity<String> deleteUser(@RequestParam Long id) {
        boolean isDeleted = userService.deleteUser(id);

        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }

    @GetMapping("/get-user")
    public User getUserById(@RequestParam Long id){
        return userService.getUserById(id);
    }


    @GetMapping("/get-all-counselors")
    public List<Counselor> getAllCounselors() {
        return userService.getAllCounselors();
    }
    @GetMapping("/get-inactive-counselors")
    public List<InactiveCounselorDTO> getAllInactiveCounselors() {
        return userService.getAllInactiveCounselors();
    }

    @PostMapping("/approve-counselor")
    public ResponseEntity<String> approveCounselor(@RequestParam String userId, @RequestParam String userEmail) throws MessagingException {
        System.out.println("Incoming request: userId=" + userId + ", userEmail=" + userEmail);
        emailService.sendAccountSetupEmail(userEmail, userId);
        return ResponseEntity.ok("Counselor approved and email sent successfully.");
    }



    @PostMapping("/account-setup")
    public ResponseEntity<AccountSetupResDTO>accountSetup(@RequestBody AccountSetupReqDTO request) {
        return ResponseEntity.ok(userService.accountSetup(request));
    }
}
