package com.exam.model.exam;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.exam.model.User;

@Entity
@Table(name="attempt")
public class Attempt {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long attemptid;
//	@CreationTimestamp 
	private String dateTime;
	private long totalMarks;
	private double marksGot;
	private long totalQuestions;
	private long attemptedAnswers;
	private long unattemptedAnswers;
	private long correctAnswers;
	private long incorrectAnswers;
	
	@ManyToOne(fetch = FetchType.EAGER)
    private User user;
		
	@ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;

	public Attempt() {
	}

	public Attempt(long attemptid, String dateTime, long totalMarks, double marksGot, long totalQuestions,
			long attemptedAnswers, long unattemptedAnswers, long correctAnswers, long incorrectAnswers) { 
		this.attemptid = attemptid;
		this.dateTime = dateTime;
		this.totalMarks = totalMarks;
		this.marksGot = marksGot;
		this.totalQuestions = totalQuestions;
		this.attemptedAnswers = attemptedAnswers;
		this.unattemptedAnswers = unattemptedAnswers;
		this.correctAnswers = correctAnswers;
		this.incorrectAnswers = incorrectAnswers;
	}

	public long getAttemptid() {
		return attemptid;
	}

	public void setAttemptid(long attemptid) {
		this.attemptid = attemptid;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public long getTotalMarks() {
		return totalMarks;
	}

	public void setTotalMarks(long totalMarks) {
		this.totalMarks = totalMarks;
	}

	public double getMarksGot() {
		return marksGot;
	}

	public void setMarksGot(double marksGot) {
		this.marksGot = marksGot;
	}

	public long getTotalQuestions() {
		return totalQuestions;
	}

	public void setTotalQuestions(long totalQuestions) {
		this.totalQuestions = totalQuestions;
	}

	public long getAttemptedAnswers() {
		return attemptedAnswers;
	}

	public void setAttemptedAnswers(long attemptedAnswers) {
		this.attemptedAnswers = attemptedAnswers;
	}

	public long getUnattemptedAnswers() {
		return unattemptedAnswers;
	}

	public void setUnattemptedAnswers(long unattemptedAnswers) {
		this.unattemptedAnswers = unattemptedAnswers;
	}

	public long getCorrectAnswers() {
		return correctAnswers;
	}

	public void setCorrectAnswers(long correctAnswers) {
		this.correctAnswers = correctAnswers;
	}

	public long getIncorrectAnswers() {
		return incorrectAnswers;
	}

	public void setIncorrectAnswers(long incorrectAnswers) {
		this.incorrectAnswers = incorrectAnswers;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Quiz getQuiz() {
		return quiz;
	}

	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}
		
}


//insert into attempt(attemptid,attempted_answers,correct_answers,date,incorrect_answers,marks_got,time,total_marks,total_questions,unattempted_answers,quiz_quizid,user_user_id) values(70,5,3,'12-12-12',2,30,'10:02:33',100,10,5,13,61);