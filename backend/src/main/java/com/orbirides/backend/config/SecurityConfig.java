package com.orbirides.backend.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.orbirides.backend.filter.CustomFilterForJWT;

//THIS CLASS IS CONFIGURATION CLASS WHEREIN WE WILL CONFIGURE-FILTERCHAINS.


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

 @Autowired
 private CustomFilterForJWT jwtAuthenticationFilter;

 @Bean
 public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
     http
             .csrf().disable()
             .cors().and()
             .authorizeHttpRequests((requests) -> requests
                     .requestMatchers("/auth/**").permitAll()
                     .requestMatchers("/admin/**").hasRole("ADMIN")
                     .requestMatchers("/user/**").hasAnyRole("PASSANGER", "ADMIN","DRIVER")
                     .anyRequest().authenticated()
             )
             .httpBasic().disable()
             .formLogin().disable()
             .logout().disable();

     // Add JWT filter before the default UsernamePasswordAuthenticationFilter
     http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

     return http.build();
 }



}
