package com.Interviee.demo.service;
import com.Interviee.demo.model.BlogPost;
import com.Interviee.demo.model.Comment;
import com.Interviee.demo.model.Post;
import com.Interviee.demo.repository.BlogPostRepository;
import com.Interviee.demo.repository.CommentRepository;
import com.Interviee.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BlogPostRepository blogPostRepository;
    @Autowired
    private PostRepository postRepository;
    @Override
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
    }

    @Override
    public Comment addCommentToPost(Long postId, Comment comment) {
        Optional<Post> postOpt = postRepository.findById(postId);
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            // Maintain bidirectional relationship
            post.addComment(comment);
            // Saving comment directly because cascade is set on Post -> comments
            // But since we have commentRepository, we can save comment separately
            return commentRepository.save(comment);
        }
        return null;
    }
}
