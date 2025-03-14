package com.consultpro.app.service;


import com.consultpro.app.dto.*;
import com.consultpro.app.entity.Client;
import com.consultpro.app.entity.Counselor;
import com.consultpro.app.entity.User;
import com.consultpro.app.enums.ROLE;
import com.consultpro.app.enums.USER_STATUS;
import com.consultpro.app.exception.UserAlreadyExistsException;
import com.consultpro.app.exception.UserNotFoundException;
import com.consultpro.app.repository.AppointmentRepository;
import com.consultpro.app.repository.ClientRepository;
import com.consultpro.app.repository.CounselorRepository;
import com.consultpro.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Kanchana_m
 */

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CounselorRepository counselorRepository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final AppointmentRepository appointmentRepository;


    @Transactional
    public User updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User updatedUser = userRepository.save(user);

        if (user.getRole().equals(ROLE.COUNSELOR)) {
            Counselor counselor = counselorRepository.findByUser(user).orElseThrow(() -> new UserNotFoundException("Counselor not found"));
            counselor.setFirstName(userDTO.getFirstName());
            counselor.setLastName(userDTO.getLastName());
            counselor.setPhoneNumber(userDTO.getPhoneNumber());
            counselor.setAddress(userDTO.getAddress());
            counselor.setGender(userDTO.getGender());
            counselor.setDob(userDTO.getDob());
            counselor.setProfilePic(userDTO.getProfilePic());
            counselorRepository.save(counselor);
        } else if (user.getRole().equals(ROLE.CLIENT)) {
            Client client = clientRepository.findByUser(user).orElseThrow(() -> new UserNotFoundException("Client not found"));
            client.setFirstName(userDTO.getFirstName());
            client.setLastName(userDTO.getLastName());
            client.setPhoneNumber(userDTO.getPhoneNumber());
            client.setAddress(userDTO.getAddress());
            client.setGender(userDTO.getGender());
            client.setDob(userDTO.getDob());
            client.setProfilePic(userDTO.getProfilePic());
            clientRepository.save(client);
        }

        return updatedUser;
    }

    @Transactional
    public AuthenticationResDTO createUser(UserDTO userDTO) {
        System.out.println("user-name :" + userDTO.getUsername());
        boolean isUserPresent = userRepository.findByUsername(userDTO.getUsername()).isPresent();

        if (isUserPresent) {
            throw new UserAlreadyExistsException("User Already Exists in the system");
        } else {
            User user = User.builder()
                    .username(userDTO.getUsername())
                    .firstName(userDTO.getFirstName())
                    .lastName(userDTO.getLastName())
                    .password(passwordEncoder.encode(userDTO.getPassword()))
                    .role(userDTO.getRole())
                    .profilePic(userDTO.getProfilePic())
                    .status(userDTO.getRole().equals(ROLE.COUNSELOR) ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE)
                    .build();

            userRepository.save(user);

            if (userDTO.getRole().equals(ROLE.COUNSELOR)) {
                Counselor counselor = Counselor.builder()
                        .user(user)
                        .firstName(userDTO.getFirstName())
                        .lastName(userDTO.getLastName())
                        .phoneNumber(userDTO.getPhoneNumber())
                        .address(userDTO.getAddress())
                        .gender(userDTO.getGender())
                        .dob(userDTO.getDob())
                        .profilePic(userDTO.getProfilePic())
                        .specialize(userDTO.getSpecialize())
                        .city(userDTO.getCity())
                        .nic(userDTO.getNic())
                        .isPsychologist(userDTO.isPsychologist())
                        .profilePic(userDTO.getProfileImage())
                        .specialize("Clinical Psychologists")
                        .degreeTranscript(userDTO.getDegreeTranscript())
                        .medicalQualification(userDTO.getMedicalQualification())
                        .experienceDescription(userDTO.getExperienceDescription())
                        .build();
                counselorRepository.save(counselor);
            } else if (userDTO.getRole().equals(ROLE.CLIENT)) {
                Client client = Client.builder()
                        .user(user)
                        .firstName(userDTO.getFirstName())
                        .lastName(userDTO.getLastName())
                        .phoneNumber(userDTO.getPhoneNumber())
                        .gender(userDTO.getGender())
                        .address(userDTO.getAddress())
                        .profilePic(userDTO.getProfilePic())
                        .dob(userDTO.getDob())
                        .build();
                clientRepository.save(client);
            }
        }
        return AuthenticationResDTO.builder()
                .username(userDTO.getUsername())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .role(userDTO.getRole().toString())
                .build();
    }


    @Transactional
    public boolean deleteUser(Long id) {
            User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Sorry, user not found"));

            if (user.getRole().equals(ROLE.COUNSELOR)) {
                Counselor counselor = counselorRepository.findByUser(user).orElseThrow(() -> new UserNotFoundException("Counselor not found"));
                appointmentRepository.deleteByCounselorId(counselor.getId());
                counselorRepository.delete(counselor);
            } else if (user.getRole().equals(ROLE.CLIENT)) {
                Client client = clientRepository.findByUser(user).orElseThrow(() -> new UserNotFoundException("Client not found"));
                appointmentRepository.deleteByClientId(client.getId());
                clientRepository.delete(client);

            }


            userRepository.delete(user);
            return true;
    }

    public AuthenticationResDTO authenticateUser(AuthenticationReqDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getEmail()).orElseThrow();
        return AuthenticationResDTO.builder()
                .Id(user.getUserId().toString())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .role(user.getRole().toString())
                .counselorId(user.getRole().equals(ROLE.COUNSELOR) ? counselorRepository.findByUser(user).orElseThrow().getId().toString() : null)
                .profilePic(user.getProfilePic())
                .message("")
                .userStatus(user.getStatus().toString())
                .responseCode(HttpStatus.OK)
                .build();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByRole(ROLE role) {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole().equals(role))
                .collect(Collectors.toList());
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Sorry, no user found with the Id :" + id));
    }

    @Transactional
    public AuthenticationResDTO createAdmin(UserDTO userDTO) {
        boolean isUserPresent = userRepository.findByUsername(userDTO.getUsername()).isPresent();

        if (isUserPresent) {
            throw new UserAlreadyExistsException("User Already Exists in the system");
        } else {
            User user = User.builder()
                    .username(userDTO.getUsername())
                    .firstName(userDTO.getFirstName())
                    .lastName(userDTO.getLastName())
                    .password(passwordEncoder.encode(userDTO.getPassword()))
                    .role(ROLE.ADMIN) // Set the role to ADMIN
                    .build();

            userRepository.save(user);
        }
        return AuthenticationResDTO.builder()
                .username(userDTO.getUsername())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .role(ROLE.ADMIN.toString())
                .build();
    }

    public List<Counselor> getAllCounselors() {
        return counselorRepository.findAll();
    }

    public List<CounselorDTO> getAllInactiveCounselors() {
        return userRepository.findUsersByStatusAndRole(USER_STATUS.INACTIVE, ROLE.COUNSELOR)
                .stream()
                .map(user -> {
                    Counselor counselor = counselorRepository.findByUser(user).orElseThrow();
                    return CounselorDTO.builder()
                            .id(counselor.getId())
                            .firstName(counselor.getFirstName())
                            .lastName(counselor.getLastName())
                            .username(user.getUsername())
                            .dob(counselor.getDob())
                            .address(counselor.getAddress())
                            .city(counselor.getCity())
                            .district(counselor.getCity())
                            .specialization(counselor.getSpecialize())
                            .contact(counselor.getPhoneNumber())
                            .isPsychiatrist(counselor.isPsychologist())
                            .medicalQualification(counselor.getMedicalQualification())
                            .profilePic(counselor.getProfilePic())
                            .nic(counselor.getNic())
                            .degreeTranscript(counselor.getDegreeTranscript())
                            .experience(counselor.getExperienceDescription())
                            .signature("") // Assuming signature is not available
                            .build();
                })
                .collect(Collectors.toList());
    }

    public List<CounselorDTO> getAllActiveCounselors() {
        return userRepository.findUsersByStatusAndRole(USER_STATUS.ACTIVE, ROLE.COUNSELOR)
                .stream()
                .map(user -> {
                    Counselor counselor = counselorRepository.findByUser(user).orElseThrow();
                    return CounselorDTO.builder()
                            .id(counselor.getId())
                            .firstName(counselor.getFirstName())
                            .lastName(counselor.getLastName())
                            .username(user.getUsername())
                            .profilePic(user.getProfilePic())
                            .specialization(counselor.getSpecialize())
                            .dob(counselor.getDob())
                            .address(counselor.getAddress())
                            .contact(counselor.getPhoneNumber())
                            .city(counselor.getCity())
                            .medicalQualification(counselor.getMedicalQualification())
                            .nic(counselor.getNic())
                            .degreeTranscript(counselor.getDegreeTranscript())
                            .build();
                })
                .collect(Collectors.toList());
    }


    @Transactional
    public AccountSetupResDTO accountSetup(AccountSetupReqDTO accountSetupReqDTO) {
        User user = userRepository.findByUsername(accountSetupReqDTO.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(accountSetupReqDTO.getPassword()));
        user.setStatus(USER_STATUS.valueOf(String.valueOf(USER_STATUS.ACTIVE)));
        userRepository.save(user);

        AccountSetupResDTO accountSetupResDTO = AccountSetupResDTO.builder()
                .Id(user.getUserId().toString())
                .username(user.getUsername())
                .role(user.getRole().toString())
                .message("Account setup successfully")
                .userStatus(user.getStatus().toString())
                .email(user.getUsername())
                .build();
        return accountSetupResDTO;
    }
}
