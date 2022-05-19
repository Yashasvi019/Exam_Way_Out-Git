package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.exam.helper.UserFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.model.exam.Quiz;
import com.exam.service.UserService;


@RequestMapping("/examwayout/user")
@RestController
@CrossOrigin(origins="*")
public class UserController {

	@Autowired 
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	//creating user
//	@CrossOrigin
	@PostMapping("/register")
	public User createUser(@RequestBody User user) throws Exception{
		user.setProfile("default.png");
		//encoding password with BCryptPasswordEncoder
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		Set<UserRole> roles = new HashSet<>();
		
		Role role=new Role();
		role.setRoleId(45L);
		role.setRoleName("NORMAL");
		
//		Set<UserRole> userRoleSet = new HashSet<>();
		UserRole userRole=new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		roles.add(userRole);
		
		return this.userService.createUser(user, roles);
		
	}
	
	//getting user by username
		@GetMapping("/getUserByUsername/{username}")
		public User getUser(@PathVariable("username") String username) {
			
			return this.userService.getUser(username);
			
		}
		
		//deleting user by userId
		@DeleteMapping("/deleteUserByUserId/{userId}")
		public void deleteUserId(@PathVariable("userId") Long userId) {
			
			 this.userService.deleteUserId(userId);
			
		}
		
		@ExceptionHandler(UserFoundException.class)
	    public ResponseEntity<?> exceptionHandler(UserFoundException ex) {
	        return ResponseEntity.ok(ex.getMessage());
	    }
		
		//update user
		@PutMapping("/updateUser")
		public User updateUser(@RequestBody User user) {
			return this.userService.updateUser(user);
		}
		
		//getting all users
		@GetMapping("/getAllUser")
		public ResponseEntity<?> getAllUser() {
			
			return ResponseEntity.ok(this.userService.getAllUser());
			
		}

}
