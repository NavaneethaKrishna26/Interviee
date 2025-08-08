package com.Interviee.demo.controller;

import com.Interviee.demo.model.BlogPost;
import com.Interviee.demo.model.Comment;
import com.Interviee.demo.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import com.Interviee.demo.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*") // Enable this for frontend integration
public class BlogPostController {

    @Autowired
    private BlogPostService postService;
    @Autowired
    private CommentService commentService;
    @PostMapping
    public BlogPost createPost(@RequestBody BlogPost post) {
        return postService.createPost(post);
    }

    @GetMapping
    public List<BlogPost> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public BlogPost getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @GetMapping("/filter")
    public List<BlogPost> filterPosts(
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String branch) {
        return postService.filterPosts(company, role, branch);
    }
    @PutMapping("/{postId}/like")
    public ResponseEntity<Void> likePost(@PathVariable Long postId) {
        boolean success = postService.incrementLike(postId);
        if (success) return ResponseEntity.ok().build();
        else return ResponseEntity.notFound().build();
    }

    @GetMapping("/{postId}/comments")
    public List<Comment> getComments(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody Comment comment) {
        System.out.println("Trying to add comment to postId = " + postId);
        Comment saved = commentService.addCommentToPost(postId, comment);
        if (saved != null) return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        else return ResponseEntity.notFound().build();
    }

}
