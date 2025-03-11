package com.consultpro.app.repository;

import com.consultpro.app.entity.Client;
import com.consultpro.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Author: Kanchana Kalansooriya
 * Since: 11/10/2024
 */
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findByUser(User user);

}