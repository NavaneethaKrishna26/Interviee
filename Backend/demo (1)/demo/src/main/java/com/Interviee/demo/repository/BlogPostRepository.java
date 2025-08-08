package com.Interviee.demo.repository;


import com.Interviee.demo.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    List<BlogPost> findByCompanyNameContainingIgnoreCase(String keyword);
    List<BlogPost> findByRoleContainingIgnoreCase(String keyword);
    List<BlogPost> findByBranchContainingIgnoreCase(String keyword);
    @Query("SELECT b FROM BlogPost b WHERE " +
            "(:company IS NULL OR LOWER(b.companyName) LIKE LOWER(CONCAT('%', :company, '%'))) AND " +
            "(:role IS NULL OR LOWER(b.role) LIKE LOWER(CONCAT('%', :role, '%'))) AND " +
            "(:branch IS NULL OR LOWER(b.branch) LIKE LOWER(CONCAT('%', :branch, '%')))")
    List<BlogPost> filterPosts(@Param("company") String company,
                               @Param("role") String role,
                               @Param("branch") String branch);
}
