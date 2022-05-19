package com.exam.helper;

public class UserNotFoundException extends Exception {

	public UserNotFoundException() {
		super("User with this username is not present!! Try with the right username! ");
	}
	
	public UserNotFoundException(String msg) {
		super(msg);
	}
	
}
