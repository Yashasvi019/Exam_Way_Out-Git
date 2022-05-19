package com.exam.service.implementation;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.model.exam.Attempt;
import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.repository.AttemptRepository;
import com.exam.service.AttemptService;

@Service
public class AttemptServiceImplementation implements AttemptService {

	@Autowired
	private AttemptRepository attemptRepository;
	
	@Override
	public Attempt addAttempt(Attempt attempt) {
		return this.attemptRepository.save(attempt);
	}

	@Override
	public Attempt getAttempt(Long attemptId) {
		return this.attemptRepository.findById(attemptId).get();
	}

	@Override
	public Attempt updateAttempt(Attempt attempt) {
		return this.attemptRepository.save(attempt);
	}

	@Override
	public Set<Attempt> getAttempts() {
		return new LinkedHashSet<>(this.attemptRepository.findAll());
	}

	@Override
	public void deleteAttempt(Long attemptId) {
		
		Attempt attempt=new Attempt();
		attempt.setAttemptid(attemptId);
		this.attemptRepository.delete(attempt);
		
	}

	@Override
	public List<Attempt> getAttemptByUserId(User user) {
		return this.attemptRepository.findByUser(user);
	}
	
	@Override
	public List<Attempt> getAttemptByQuizId(Quiz quiz) {
		return this.attemptRepository.findByQuiz(quiz);
	}

}
