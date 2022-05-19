package com.exam.service.implementation;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.helper.UserFoundException;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImplementation implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	//creating user
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		
		User local = this.userRepository.findByUsername(user.getUsername());
		if(local!=null) {
			System.out.println("User is already present !! ");
			//throw new Exception("User already present !! ");
			throw new UserFoundException();
		}else {
			//user create
			for(UserRole ur:userRoles) {
				roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			local=this.userRepository.save(user);
		}
		return local;
	}
	
	//getting user by username
	@Override
	public User getUser(String username) {
		return this.userRepository.findByUsername(username);
	}
	
	//deleting user by userId
		public void deleteUserId(Long userId) {
			this.userRepository.deleteById(userId);
		}

		@Override
		public User updateUser(User user) {
			return this.userRepository.save(user);
		}

		@Override
		public Set<User> getAllUser() {	
			return new HashSet<>(this.userRepository.findAll());
		}
		
}
