package com.consultpro.app.repository;

import com.consultpro.app.entity.Counselor;
import com.consultpro.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author : Kanchana Kalansooriya
 * @since 11/10/2024
 */
@Repository
public interface CounselorRepository extends JpaRepository<Counselor, Long> {
  Optional<Counselor> findByUser(User user);
}

