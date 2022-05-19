package com.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.model.User;
import com.exam.model.exam.Attempt;
import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

public interface AttemptRepository extends JpaRepository<Attempt,Long> {
	
	public List<Attempt> findByUser(User user);
	
	public List<Attempt> findByQuiz(Quiz quiz);

}
