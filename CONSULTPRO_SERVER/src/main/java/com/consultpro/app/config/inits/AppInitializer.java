package com.consultpro.app.config.inits;
import com.consultpro.app.dto.UserDTO;
import com.consultpro.app.enums.ROLE;
import com.consultpro.app.exception.UserAlreadyExistsException;
import com.consultpro.app.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author : Kanchana Kalansooriya
 * @since 11/12/2024
 */


@Component
public class AppInitializer implements CommandLineRunner {

    private final UserService userService;

    public AppInitializer(UserService userService ) {
        this.userService = userService;;
    }

    @Override
    public void run(String... args) throws Exception {
        initializeAdminUsers();

    }

    private void initializeAdminUsers() {
        UserDTO adminUser =UserDTO.builder()
                        .username("admin@gmail.com")
                        .password("admin123")
                        .role(ROLE.ADMIN)
                 .build();

        try {
            userService.createAdmin(adminUser);
        } catch (UserAlreadyExistsException e) {
            System.out.println("Admin user already exists: " + e.getMessage());
        }
    }

}