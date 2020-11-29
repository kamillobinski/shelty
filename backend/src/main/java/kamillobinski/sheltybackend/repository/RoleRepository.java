package kamillobinski.sheltybackend.repository;

import kamillobinski.sheltybackend.entity.ERole;
import kamillobinski.sheltybackend.entity.Role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByName(ERole name);

    Role findRoleById(int id);

}
