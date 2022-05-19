package com.exam.service;

import java.util.List;
import java.util.Set;

import com.exam.model.User;
import com.exam.model.exam.Attempt;
import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

public interface AttemptService {

	public Attempt addAttempt(Attempt attempt);

	public Attempt getAttempt(Long attemptId);
	
	public Attempt updateAttempt(Attempt attempt);
	
	public Set<Attempt> getAttempts();

	public void deleteAttempt(Long attemptId);

	public List<Attempt> getAttemptByUserId(User user);
	
	public List<Attempt> getAttemptByQuizId(Quiz quiz);

}
