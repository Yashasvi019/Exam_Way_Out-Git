package com.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.User;
import com.exam.model.exam.Attempt;
import com.exam.model.exam.Quiz;
import com.exam.service.AttemptService;

@RestController
@RequestMapping("/examwayout/attempt")
@CrossOrigin("*")
public class AttemptController {
	
	@Autowired
	private AttemptService attemptService;
	
	//add attempt
	@PostMapping("/addAttempt")
	public ResponseEntity<Attempt> addAttempt(@RequestBody Attempt attempt) {
		Attempt attempt1=this.attemptService.addAttempt(attempt);
		return ResponseEntity.ok(attempt1);
	}
	
	//get attempt
	@GetMapping("/getAttempt/{attemptId}")
	public Attempt getAttempt(@PathVariable("attemptId") Long attemptId) {
		return this.attemptService.getAttempt(attemptId);
	}
	
	//get all attempts
	@GetMapping("/getAttempts")
	public ResponseEntity<?> getAttempts() {
		return ResponseEntity.ok(this.attemptService.getAttempts());
	}
	
	//update attempt
	@PutMapping("/updateAttempt")
	public Attempt updateAttempt(@RequestBody Attempt attempt) {
		return this.attemptService.updateAttempt(attempt);
	}
	
	//delete category
	@DeleteMapping("/deleteAttempt/{attemptId}")
	public void deleteAttempt(@PathVariable("attemptId") Long attemptId) {
		this.attemptService.deleteAttempt(attemptId);
	}
	
	//get attempt by user id-> 1 user has attempted which which quiz
	@GetMapping("/getAttemptByUserId/{userId}")
	public List<Attempt> getAttemptByUserId(@PathVariable("userId") Long userId) {
		User user=new User();
		user.setId(userId);
		return this.attemptService.getAttemptByUserId(user);
	}
	
	//get attempt by quiz id-> 1 quiz was attempted by which which user 
	@GetMapping("/getAttemptByQuizId/{quizId}")
	public List<Attempt> getAttemptByQuizId(@PathVariable("quizId") Long quizId) {
		Quiz quiz=new Quiz();
		quiz.setQuizid(quizId);
		return this.attemptService.getAttemptByQuizId(quiz);
	}

}
