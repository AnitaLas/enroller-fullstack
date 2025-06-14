package com.company.enroller.e2e.meetingsManagement;

import com.company.enroller.e2e.BasePage;
import com.company.enroller.e2e.Const;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;

import java.util.List;

public class MeetingsPage extends BasePage {

    @FindBy(xpath = "//*[contains(text(), \"" + Const.NEW_MEETING_BTN_LABEL + "\")]")
    @CacheLookup
    private WebElement addNewMeetingBtn;

    @FindBy(css = "form > input")
    private WebElement meetingTitleInput;

    @FindBy(css = "form > textarea")
    private WebElement meetingDescInput;

    @FindBy(css = "form > button")
    private WebElement confirmMeetingBtn;

    @FindBy(css = "#root > div > div > div > table > tbody > tr")
    private List<WebElement> meetingRows;


    public MeetingsPage(WebDriver driver) {
        super(driver);
    }

    public void addNewMeeting(String title, String desc) {
        this.click(this.addNewMeetingBtn);
        this.meetingTitleInput.sendKeys(title);
        this.meetingDescInput.sendKeys(desc);
        this.click(this.confirmMeetingBtn);

    }

    public List<WebElement> getAllMeetings() {
        return this.meetingRows;
    }

    public WebElement getLastMeeting() {
        if (meetingRows.isEmpty()) {
            return null;
        }
        return meetingRows.get(meetingRows.size() - 1);
    }

    public void deleteMeeting(WebElement meetingElement) {
        WebElement deleteBtn = meetingElement.findElement(By.cssSelector(" td:nth-child(4) > button"));
        this.click(deleteBtn);
    }

    public WebElement getMeetingByTitle(String title) {
        List<WebElement> meetings = driver.findElements(By.xpath("//td[normalize-space(text())='" + title + "']/parent::tr"));
        if (meetings.isEmpty()) {
            return null;
        }
        return meetings.get(0);
    }

    public void registerToMeeting(WebElement meetingElement) {
        WebElement registerButton = meetingElement.findElement(By.cssSelector("#root > div > div > div > table > tbody > tr > td:nth-child(4) > button:nth-child(1)"));
        this.click(registerButton);
    }

}
