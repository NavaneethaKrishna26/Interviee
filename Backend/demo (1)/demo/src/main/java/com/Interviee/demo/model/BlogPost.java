package com.Interviee.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "blog_post")
public class BlogPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String role;
    private LocalDate interviewDate;
    private String branch;
    private int numberOfRounds;

    @Column(columnDefinition = "TEXT")
    private String experience;

    @Column(columnDefinition = "TEXT")
    private String tips;

    private String authorName;
    private LocalDate datePosted;

    private String tags;
    private int likeCount = 0;
    // No-arg constructor
    public BlogPost() {
    }

    // Getters and Setters for ALL fields

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public int getNumberOfRounds() {
        return numberOfRounds;
    }

    public void setNumberOfRounds(int numberOfRounds) {
        this.numberOfRounds = numberOfRounds;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getTips() {
        return tips;
    }

    public void setTips(String tips) {
        this.tips = tips;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public LocalDate getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDate datePosted) {
        this.datePosted = datePosted;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }
    @Override
    public String toString() {
        return "BlogPost{" +
                "id=" + id +
                ", companyName='" + companyName + '\'' +
                ", role='" + role + '\'' +
                ", interviewDate=" + interviewDate +
                ", branch='" + branch + '\'' +
                ", numberOfRounds=" + numberOfRounds +
                ", experience='" + experience + '\'' +
                ", tips='" + tips + '\'' +
                ", authorName='" + authorName + '\'' +
                ", datePosted=" + datePosted +
                ", tags='" + tags + '\'' +
                '}';
    }
}
