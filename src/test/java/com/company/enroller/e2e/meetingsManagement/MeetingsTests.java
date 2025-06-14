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
import java.util.List;

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

//        this.driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(40));

    }

    // TODO: Dodaj sprawdzenie czy poprawnie został dodany opis.
    // TODO: Dodaj sprawdzenie czy zgadza się aktualna liczba spotkań.
    @Test
    @DisplayName("[SPOTKANIA.1] The meeting should be added to your meeting list. It should contain a title and description.")
    void addNewMeeting() {

        this.loginPage.loginAs(Const.USER_II_NAME);

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement meetingLabel = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("#root > div > div > div > h2")
        ));

        wait.until(ExpectedConditions.textToBePresentInElement(meetingLabel, "(2)"));
        String labelText = meetingLabel.getText();
        assertThat(labelText).contains("2");

        this.page.addNewMeeting(Const.MEETING_III_TITLE, Const.MEETING_DESC);

        wait.until(ExpectedConditions.textToBePresentInElement(meetingLabel, "(3)"));
        assertThat(meetingLabel.getText()).contains("3");

        WebElement newMeeting = this.page.getMeetingByTitle(Const.MEETING_III_TITLE);
        assertThat(newMeeting).isNotNull();
        assertThat(newMeeting.getText()).contains(Const.MEETING_DESC);

        assertThat(this.page.getMeetingByTitle(Const.MEETING_III_TITLE)).isNotNull();

    }

    // TODO: Sprawdź czy użytkownik może dodać spotkanie bez nazwy. Załóż że nie ma takiej możliwości a warunkiem
    //  jest nieaktywny przycisk "Dodaj".
    @Test
    @DisplayName("[SPOTKANIA.2] Użytkownik nie może dodać spsotkanie bez tytułu. Przycisk 'Dodaj' jest nieaktywny.")
    void cannotAddMeetingWithoutTitle() {

        this.loginPage.loginAs(Const.USER_I_NAME);
        this.page.addNewMeeting(Const.MEETING_IV_EMPTY_TITLE, Const.MEETING_DESC);
        WebElement addButton = driver.findElement(By.cssSelector("#root > div > div > div > form > button"));

        assertThat(addButton.isEnabled()).isFalse();
    }



    // TODO: Sprawdź czy użytkownik może poprawnie zapisać się do spotkania.
    @Test
    @DisplayName("[SPOTKANIA.3] Sprawdzenie, czy użytkownik może zapisać się na spotkanie.")
    void registerToMeeting() {
        this.loginPage.loginAs(Const.USER_I_NAME);

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(driver -> this.page.getMeetingByTitle(Const.MEETING_II_TITLE) != null);

        WebElement meeting = this.page.getMeetingByTitle(Const.MEETING_II_TITLE);
        assertThat(meeting).isNotNull();
        this.page.registerToMeeting(meeting);

        WebElement button = meeting.findElement(By.cssSelector("#root > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(4) > button"));
        String buttonText = button.getText().toLowerCase();
        assertThat(buttonText).contains("wypisz się");

    }


    // TODO: Sprawdź czy użytkownik może usunąć puste spotkanie.
    @Test
    @DisplayName("[SPOTKANIA.4] Sprawdza czy użytkownik może usunąć spotkanie bez tytułu i opisu.")
    void deleteEmptyMeeting() throws InterruptedException {

        this.loginPage.loginAs(Const.USER_I_NAME);
        this.page.addNewMeeting("", "");

        WebElement emptyMeeting = this.page.getLastMeeting();
        assertThat(emptyMeeting).isNotNull();

        this.page.deleteMeeting(emptyMeeting);
        String deletedMeetingText = "";

        boolean isRemoved = false;
        for (int i = 0; i < 5; i++) {
            Thread.sleep(1000);
            List<WebElement> currentMeetings = this.page.getAllMeetings();
            isRemoved = true;
            for (WebElement el : currentMeetings) {
                if (el.getText().trim().equals(deletedMeetingText)) {
                    isRemoved = false;
                    break;
                }
            }
            if (isRemoved) break;
        }

        assertThat(isRemoved).isTrue();
    }

    @AfterEach
    void exit() {
        this.page.quit();
        this.removeAllMeeting();
    }


}
