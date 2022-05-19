package com.exam.helper;

public class UserFoundException extends Exception {

	public UserFoundException() {
		super("User with this username is already present!! Try with some different username! ");
	}
	
	public UserFoundException(String msg) {
		super(msg);
	}
	
}
