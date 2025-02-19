package com.orbirides.backend.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orbirides.backend.entity.User;
import com.orbirides.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;


@Service
public class UserService{

	@Autowired
	UserRepository userRepo;
	
//	@Autowired
//	private PasswordEncoder passwordEncoder;

	

	public boolean createNewUser(User newUser) {
		
		User entityUser = new User();
		BeanUtils.copyProperties(newUser, entityUser);
		userRepo.save(entityUser);
		
		return true;
	}

	public User fetchUserByID(long id) {
		
		User entityUser = (User)userRepo.findById(id).get();
		return entityUser;
	}

	public User updateUserDetails(long id, User updatedUser) {
		
		return userRepo.findById(id)
                .map(existingUser -> {
                    if (updatedUser.getUserName() != null) {
                        existingUser.setUserName(updatedUser.getUserName());
                    }
                    if (updatedUser.getName() != null) {
                        existingUser.setName(updatedUser.getName());
                    }
                    if (updatedUser.getEmail() != null) {
                        existingUser.setEmail(updatedUser.getEmail());
                    }
                    if (updatedUser.getPhoneNumber() != null) {
                        existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
                    }
                    if (updatedUser.getProfilePicture() != null) {
                        existingUser.setProfilePicture(updatedUser.getProfilePicture());
                    }
                    
                    if (updatedUser.getDriverLicense() != null) {
                        existingUser.setDriverLicense(updatedUser.getDriverLicense());
                    }
                    
                    return userRepo.save(existingUser);
                })
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
	}

	public List<User> fetchAllUSers() {
		
		List<User> userList = userRepo.findAll();
	
		return userList;
	}

	public User deleteUser(long id) {
		
		if(userRepo.findById(id).isPresent()) {
			
			User dbUser = userRepo.findById(id).get();
			userRepo.deleteById(id);
			return dbUser;
		}
		else {
			return null;
		}
	}
	

}
