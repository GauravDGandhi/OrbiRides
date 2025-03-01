package com.orbirides.backend.config;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.orbirides.backend.entity.User;
import com.orbirides.backend.enums.Role;
import com.orbirides.backend.repository.UserRepository;



@Service
public class CustomDBBasedUserDetailsService  implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // We are providing our own custom logic for verifying user authentication.
        User user = userRepository.findByUserName(username).get();

        // 1. If user is not found.
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // 2. If user is legal return the instance of `UserDetails`---------------------------------------------------------------------
        // a. Mapping custom_role_system to spring_security_compatible role_system
        Role authorities = user.getRole();
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(authorities.toString()));

        // b. Returning UserDetails instance having user info and permissions
        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getPasswordHash(),
                true,
                true, // accountNonExpired
                true, // credentialsNonExpired
                true, // accountNonLocked
                grantedAuthorities);
    }
}
