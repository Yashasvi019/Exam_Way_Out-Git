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

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/examwayout/quiz")
@CrossOrigin("*")
public class QuizController {
	
	@Autowired
	private QuizService quizService;
	
	//add quiz 
	@PostMapping("/addQuiz")
	public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {
		Quiz quiz1=this.quizService.addQuiz(quiz);
		return ResponseEntity.ok(quiz1);
	}
	
	//update quiz
	@PutMapping("/updateQuiz")
	public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) {
		return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
	}
	
	//get all quizzes
	@GetMapping("/getQuizzes")
	public ResponseEntity<?> getQuizzes() {
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}

	//get single quiz
	@GetMapping("/getQuiz/{quizId}")
	public Quiz getQuiz(@PathVariable("quizId") Long quizId) {
		return this.quizService.getQuiz(quizId);
	}
	
	//delete quiz
	@DeleteMapping("/deleteQuiz/{quizId}")
	public void deleteQuiz(@PathVariable("quizId") Long quizId) {
		this.quizService.deleteQuiz(quizId);
	}
	
	//get all quizzes of a particular category
	@GetMapping("/getQuizzesOfCategory/{cId}")
	public List<Quiz> getQuizzesOfCategory(@PathVariable("cId") Long cId) {
		Category category=new Category();
		category.setCid(cId);
		return this.quizService.getQuizzesOfCategory(category);
	}
	
	//get all active quizzes
	@GetMapping("/getActiveQuizzes")
	public List<Quiz> getActiveQuizzes() {
		return this.quizService.getActiveQuizzes();
	}
	
	//get all active quizzes of a particular category
	@GetMapping("/getActiveQuizzesOfCategory/{cId}")
	public List<Quiz> getActiveQuizzesOfCategory(@PathVariable("cId") Long cId) {
		Category category=new Category();
		category.setCid(cId);
		return this.quizService.getActiveQuizzesOfCategory(category);
	}

}
