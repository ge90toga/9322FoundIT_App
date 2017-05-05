package com.seek.api.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "comment")
public class Comment implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author")
    private Role author;

    @Column(name = "review")
    private Role review;

    @Column(name = "date")
    private Role date;

    @Column(name = "post_id")
    private Long postId;

    public Comment() {
    }

    public Comment(Role author, Role review, Role date) {
        this.author = author;
        this.review = review;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Role getAuthor() {
        return author;
    }

    public void setAuthor(Role author) {
        this.author = author;
    }

    public Role getReview() {
        return review;
    }

    public void setReview(Role review) {
        this.review = review;
    }

    public Role getDate() {
        return date;
    }

    public void setDate(Role date) {
        this.date = date;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Comment)) return false;
        Comment comment = (Comment) o;
        return Objects.equals(id, comment.id) &&
                Objects.equals(author, comment.author) &&
                Objects.equals(review, comment.review) &&
                Objects.equals(date, comment.date) &&
                Objects.equals(postId, comment.postId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, author, review, date, postId);
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", author='" + author + '\'' +
                ", review='" + review + '\'' +
                ", date='" + date + '\'' +
                ", postId=" + postId +
                '}';
    }
}
