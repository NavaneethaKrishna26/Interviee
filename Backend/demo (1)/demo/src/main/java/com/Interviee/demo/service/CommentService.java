package com.Interviee.demo.service;

import com.Interviee.demo.model.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsByPostId(Long postId);
    Comment addCommentToPost(Long postId, Comment comment);
}
