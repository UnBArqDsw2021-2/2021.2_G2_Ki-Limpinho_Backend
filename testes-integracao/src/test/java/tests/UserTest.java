package tests;

import core.Core;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;


@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserTest extends Core {
    private static String idUser;

    @Test
    public void tc01_getAllUsers() {
        given()
                .when()
                .get("/api/users")
                .then()
                .statusCode(200)
        ;
    }

    @Test
    public void tc02_tryRegisterEmptyUser() {

        given()
                .body("{}")
                .when()
                .post("/api/users")
                .then()
                .statusCode(400)
                .body("message", is("\"name\" is required and " +
                        "\"email\" is required and " +
                        "\"cpf\" is required and " +
                        "\"password\" is required"))
        ;
    }

    @Test
    public void tc03_tryRegisterUserSuccessfully() {

        idUser = given()
                .body(" {\"name\": \"Rogerio do Inga\", " +
                        "\"cpf\": \"01256710111\", " +
                        "\"email\": \"rogerThat@gogo.do\"," +
                        "\"password\": \"123senha123\"}")
                .when()
                .post("/api/users")
                .then()
                .statusCode(201)
                .body("name", is("Rogerio do Inga"))
                .body("cpf", is("01256710111"))
                .body("email", is("rogerThat@gogo.do"))
                .body("password", is("123senha123"))
                .extract().path("_id")
        ;
    }

    @Test
    public void tc04_gettingUserByIdSuccessfully() {
        given()
                .when()
                .get("/api/users/" + idUser)
                .then()
                .statusCode(200)
                .body("name", is("Rogerio do Inga"))
                .body("cpf", is("01256710111"))
                .body("email", is("rogerThat@gogo.do"))
                .body("password", is("123senha123"))
        ;
    }

    @Test
    public void tc05_changeUserSuccessfully() {
        given()
                .body("{\"updates\": " +
                        "[{\"chave\": \"name\"," +
                        "\"valor\": \"Rogerio Skylab\"}," +
                        "{\"chave\": \"cpf\"," +
                        "\"valor\": \"11122233344\"\n}]}")
                .when()
                .patch("/api/users/" + idUser)
                .then()
                .statusCode(200)
                .body("name", is("Rogerio Skylab"))
                .body("cpf", is("11122233344"))
        ;
    }

    @Test
    public void tc06_deleteUserRegistered() {
        given()
                .when()
                .delete("/api/users/" + idUser)
                .then()
                .statusCode(200)
        ;

        given()
                .when()
                .get("/api/users" + idUser)
                .then()
                .statusCode(404)
                .body("message", is("Not Found"))
        ;

    }

    @Test
    public void tc07_tryDeleteUserNotExist() {
        given()
                .when()
                .delete("/api/users" + idUser)
                .then()
                .statusCode(404)
                .body("message", is("Not Found"))
        ;

    }
}
