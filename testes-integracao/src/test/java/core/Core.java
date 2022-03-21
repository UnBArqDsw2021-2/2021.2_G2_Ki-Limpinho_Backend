package core;

import constants.Constants;
import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.builder.ResponseSpecBuilder;
import org.junit.BeforeClass;

import static org.hamcrest.Matchers.lessThan;

public class Core {

    @BeforeClass
    public static void setup(){
        RestAssured.baseURI = Constants.BASE_URL;
        RestAssured.port = Constants.PORT;

        RequestSpecBuilder request = new RequestSpecBuilder();
        request.setContentType(Constants.CONTENT_TYPE_BASE);
        RestAssured.requestSpecification = request.build();

        ResponseSpecBuilder response = new ResponseSpecBuilder();
        response.expectResponseTime(lessThan(Constants.MAXTIMOUT));
        RestAssured.responseSpecification = response.build();

        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
    }
}
