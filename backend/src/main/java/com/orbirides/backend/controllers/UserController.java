package com.orbirides.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orbirides.backend.entity.User;
import com.orbirides.backend.services.UserService;



@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserService userServices;
	
	@PostMapping("/createNewUser")
	public boolean createNewUser(@RequestBody User user) {
		return userServices.createNewUser(user); 
	}
	
	@GetMapping("/getUserDetails/{uid}")
	public User getUserById(@PathVariable("uid") long uid) {
		return userServices.fetchUserByID(uid);
	}
	
	@PostMapping("/updateUserDetails/{uid}")
	public User updateTicket(@PathVariable("uid")long uid,@RequestBody User updatedUser) {
		return userServices.updateUserDetails(uid,updatedUser);
	}
	
	@PostMapping("/deleteUser/{uid}")
	public User  deleteUser(@PathVariable("uid") long uid) {
		return userServices.deleteUser(uid);
	}
	
	@GetMapping("/allUsersDetails")
	public List<User> getAllUserDetails() {
		return userServices.fetchAllUSers();
	}
	
	
	
}
