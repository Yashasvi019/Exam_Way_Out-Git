package com.exam.model;

import java.util.*;

import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.exam.model.exam.Attempt;
//import com.exam.model.exam.Attempt;
import com.exam.model.exam.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
@Table(name="users")
public class User implements UserDetails {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="userId",nullable=false)
	private Long id;
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;
	private String confirmPassword;
	private String gender;
	private String about;
	private String profile;
	private boolean enabled=true;
	
	@OneToMany(cascade=CascadeType.ALL,fetch=FetchType.EAGER,mappedBy="user")
	@JsonIgnore
	private Set<UserRole> userRoles=new HashSet<>();
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Attempt> attempts = new HashSet<>();
	
	public User() {
	}

	public User(Long id, String username, String password, String firstName, String lastName, String email,
			String phoneNumber, String confirmPassword, String gender, String about, String profile, boolean enabled) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.confirmPassword = confirmPassword;
		this.gender = gender;
		this.about = about;
		this.profile=profile;
		this.enabled = enabled;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	public Set<UserRole> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(Set<UserRole> userRoles) {
		this.userRoles = userRoles;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", email=" + email + ", phoneNumber=" + phoneNumber + ", confirmPassword="
				+ confirmPassword + ", gender=" + gender + ", about=" + about + ", profile=" + profile + ", enabled="
				+ enabled + "]";
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		Set<Authority> set=new HashSet<>();
		this.userRoles.forEach(userRole -> {
			set.add(new Authority(userRole.getRole().getRoleName()));
		});
		
		return set;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	public Set<Attempt> getAttempts() {
		return attempts;
	}

	public void setAttempts(Set<Attempt> attempts) {
		this.attempts = attempts;
	}
	
	
	
}
