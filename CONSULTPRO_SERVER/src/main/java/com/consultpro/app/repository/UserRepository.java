package com.consultpro.app.repository;


import com.consultpro.app.entity.User;
import com.consultpro.app.enums.ROLE;
import com.consultpro.app.enums.USER_STATUS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Kanchana_m
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findUsersByStatusAndRole(USER_STATUS status , ROLE role);
}
