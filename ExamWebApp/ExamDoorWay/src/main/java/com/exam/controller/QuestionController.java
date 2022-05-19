package com.exam.controller;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;

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

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;


@RestController
@RequestMapping("/examwayout/question")
@CrossOrigin("*")
public class QuestionController {
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuizService quizService;
	
	//add question
	@PostMapping("/addQuestion")
	public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
		Question question1=this.questionService.addQuestion(question);
		return ResponseEntity.ok(question1);
	}
	
	//get question
	@GetMapping("/getQuestion/{quesId}")
	public Question getQuestion(@PathVariable("quesId") Long quesId) {
		return this.questionService.getQuestion(quesId);
	}
	
	//get all questions
	@GetMapping("/getQuestions")
	public ResponseEntity<?> getQuestions() {
		return ResponseEntity.ok(this.questionService.getQuestions());
	}
	
	//update question
	@PutMapping("/updateQuestion")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}
	
	//delete question
	@DeleteMapping("/deleteQuestion/{quesId}")
	public void deleteQuestion(@PathVariable("quesId") Long quesId) {
		this.questionService.deleteQuestion(quesId);
	}
	
	
	@GetMapping("/getAllQuestionsOfQuiz/{quizId}")
	public ResponseEntity<?> getAllQuestionsOfQuiz(@PathVariable("quizId") Long quizId) {
	
		//get all questions of a particular quiz
		Quiz quiz=new Quiz();
		quiz.setQuizid(quizId);
		Set<Question> questionsOfQuiz=this.questionService.getQuestionsOfQuiz(quiz);
		return ResponseEntity.ok(questionsOfQuiz);
	}
	
	@GetMapping("/getQuestionsOfQuiz/{quizId}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("quizId") Long quizId) {
		
		//get no of question 
		Quiz quiz=this.quizService.getQuiz(quizId);
		Set<Question> questions=quiz.getQuestions();
		List<Question> list=new ArrayList<Question>(questions);
		if((list.size()) > Integer.parseInt(quiz.getNumberOfQuestions())) {
			list=list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()+1 ));
		}
		list.forEach((q)-> {
			q.setAnswer("");
		});
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
		
	}
	
	//evaluate quiz
	@PostMapping("/eval-quiz")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {
		System.out.println(questions);
		int totalMarks=0;
		double marksGot=0;
		int totalQuestions=0;
		int attempted=0;
		int unattempted=0;
		int correctAnswers=0;
		int incorrectAnswers=0;
		totalMarks=Integer.parseInt(questions.get(0).getQuiz().getMaxMarks());
		totalQuestions=questions.size();
		for(Question q:questions) {
			
			//System.out.println(q.getNewAnswer());
			//single questions
			Question question=this.questionService.get(q.getQuesid());
			if(question.getAnswer().equals(q.getNewAnswer())) {
				//correct
				correctAnswers++;
				double marksSingle=Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
				marksGot+=marksSingle;
			}
			if(q.getNewAnswer()!=null) {
				attempted++;
			}
		}
		
		unattempted=totalQuestions-attempted;
		incorrectAnswers=attempted-correctAnswers;
		
		Map<String, Number> map=Map.of(
				"totalMarks",totalMarks,"marksGot",marksGot,
				"totalQuestions",totalQuestions,"attempted",attempted,"unattempted",unattempted,
				"correctAnswers",correctAnswers,"incorrectAnswers",incorrectAnswers
				);
		return ResponseEntity.ok(map);
	}

}
