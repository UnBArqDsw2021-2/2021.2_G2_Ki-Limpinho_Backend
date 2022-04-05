package tests;

import core.Core;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;


@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class FeedbackTest extends Core {
    private static String idFeedback;
    private static String idUser;
    private static String idService;

    @Test
    public void tc01_getAllFeedbacks() {
        given()
                .when()
                .get("/api/feedbacks")
                .then()
                .statusCode(200)
        ;
    }

    @Test
    public void tc02_tryRegisterEmptyFeedback() {

        given()
                .body("{}")
                .when()
                .post("/api/feedbacks")
                .then()
                .statusCode(400)
                .body("message", is(
                        "\"rating\" is required and " +
                        "\"service\" is required and " +
                        "\"ratingBy\" is required"))
        ;
    }

    @Test
    public void tc03_tryRegisterFeedbackSuccessfully() {

        idFeedback = given()
                .body(" {\"comment\": \"Amei a lavagem americana\", " +
                        "\"rating\": 5, " +
                        "\"service\": \"12314123124\"," +
                        "\"ratingBy\": \"123241233\"}")
                .when()
                .post("/api/feedbacks")
                .then()
                .statusCode(201)
                .body("comment", is("Amei a lavagem americana"))
                .body("rating", is(5))
                .body("service", is("12314123124"))
                .body("ratingBy", is("123241233"))
                .extract().path("_id")
        ;
    }

    @Test
    public void tc04_gettingFeedbackByIdSuccessfully() {
        given()
                .when()
                .get("/api/feedbacks/" + idFeedback)
                .then()
                .statusCode(200)
                .body("comment", is("Amei a lavagem americana"))
                .body("rating", is(5))
                .body("service", is("12314123124"))
                .body("ratingBy", is("123241233"))
        ;
    }

    @Test
    public void tc05_changeFeedbackSuccessfully() {
        given()
                .body("{\"updates\": " +
                        "[{\"chave\": \"comment\"," +
                        "\"valor\": \"Odiei a lavagem americana\"}," +
                        "{\"chave\": \"rating\"," +
                        "\"valor\": 1 \n}]}")
                .when()
                .patch("/api/feedbacks/" + idFeedback)
                .then()
                .statusCode(200)
                .body("comment", is("Amei a lavagem americana"))
                .body("rating", is(1))
        ;
    }

    @Test
    public void tc06_deleteFeedbackRegistered() {
        given()
                .when()
                .delete("/api/feedbacks/" + idFeedback)
                .then()
                .statusCode(200)
        ;

        given()
                .when()
                .get("/api/feedbacks" + idFeedback)
                .then()
                .statusCode(404)
                .body("message", is("Not Found"))
        ;

    }

    @Test
    public void tc07_tryDeleteFeedbackNotExist() {
        given()
                .when()
                .delete("/api/feedbacks" + idFeedback)
                .then()
                .statusCode(404)
                .body("message", is("Not Found"));
    }

    @Test
    public void tc07_getFeedbacksByUser() {
        given()
                .when()
                .delete("/api/feedbacks/user/" + idUser)
                .then()
                .statusCode(200)
    }
    
    @Test
    public void tc07_getFeedbacksByService() {
        given()
                .when()
                .delete("/api/feedbacks/service/" + idService)
                .then()
                .statusCode(200)
    }
}
