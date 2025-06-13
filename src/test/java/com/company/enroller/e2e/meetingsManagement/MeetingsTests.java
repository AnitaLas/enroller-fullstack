package com.company.enroller.e2e.meetingsManagement;

import com.company.enroller.e2e.BaseTests;
import com.company.enroller.e2e.Const;
import com.company.enroller.e2e.authentication.LoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

public class MeetingsTests extends BaseTests {

    WebDriver driver;
    MeetingsPage page;
    LoginPage loginPage;

    @BeforeEach
    void setup() {
        this.dbInit();
        this.driver = WebDriverManager.chromedriver().create();
        this.page = new MeetingsPage(driver);
        this.loginPage = new LoginPage(driver);
        this.page.get(Const.HOME_PAGE);

        //        this.driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));

    }


    @Test
    @DisplayName("[SPOTKANIA.1] The meeting should be added to your meeting list. It should contain a title and description.")
    void addNewMeeting() {
        // TODO: Dodaj sprawdzenie czy poprawnie został dodany opis.
        // TODO: Dodaj sprawdzenie czy zgadza się aktualna liczba spotkań.

//        logowanie
        this.loginPage.loginAs(Const.USER_I_NAME);

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement meetingLabel = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("#root > div > div > div > h2")
        ));

//        sprawdza ilość przed dodaniem kolejnego spotkania do listy
        wait.until(ExpectedConditions.textToBePresentInElement(meetingLabel, "(2)"));
        String labelText = meetingLabel.getText();
        assertThat(labelText).contains("2");

//        dodanie nowego spotkania
        this.page.addNewMeeting(Const.MEETING_III_TITLE, Const.MEETING_DESC);

//        sprawdza ilość po dodaniu nowego spotkania
        wait.until(ExpectedConditions.textToBePresentInElement(meetingLabel, "(3)"));
        assertThat(meetingLabel.getText()).contains("3");

//        sprawdzanie opisu
        WebElement newMeeting = this.page.getMeetingByTitle(Const.MEETING_III_TITLE);
        assertThat(newMeeting).isNotNull();
        assertThat(newMeeting.getText()).contains(Const.MEETING_DESC);

//        to już było dodane
        assertThat(this.page.getMeetingByTitle(Const.MEETING_III_TITLE)).isNotNull();

    }

    // @Test
    // TODO: Sprawdź czy użytkownik może dodać spotkanie bez nazwy. Załóż że nie ma takiej możliwości a warunkiem
    //  jest nieaktywny przycisk "Dodaj".

    // @Test
    // TODO: Sprawdź czy użytkownik może poprawnie zapisać się do spotkania.

    // @Test
    // TODO: Sprawdź czy użytkownik może usunąć puste spotkanie.

    @AfterEach
    void exit() {
        this.page.quit();
        this.removeAllMeeting();
    }

}
