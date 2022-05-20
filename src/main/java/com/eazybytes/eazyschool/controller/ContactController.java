package com.eazybytes.eazyschool.controller;

import com.eazybytes.eazyschool.model.Contact;
import com.eazybytes.eazyschool.service.ContactService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.logging.Logger;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Slf4j
@Controller
public class ContactController {


    /*created a logger class that will log the input to terminal
    used slF4j also to remove this one line
    private static Logger log = LoggerFactory.getLogger(ContactController.class)*/


    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {

        this.contactService = contactService;
    }


    @RequestMapping("/contact")
    public String displayContactPage(Model model) {
        /*created an attribute contact and sent the new object of contact class
        indicating thymeleaf that this page will hold data belonging to contact class
        any validation performed in this contact, will be performed by spring mvc*/
        model.addAttribute("contact",new Contact());
        return "contact.html";
    }

    @RequestMapping(value = "/saveMsg",method = POST)
    public String saveMessage(@Valid @ModelAttribute("contact") Contact contact, Errors errors){
        if(errors.hasErrors()){
            log.error("Contact form validation failed" + errors.toString());
            return "contact.html";
        }
        contactService.saveMessageDetails(contact);
        /*return new ModelAndView("redirect:/contact");*/
        contactService.setCounter(contactService.getCounter()+1);
        log.info("No. of times contact form is submitted :"+ contactService.getCounter());
        return "redirect:/contact";
    }







    /*

    #1 - Method 1 (Without involving Service class)

    @RequestMapping(value = "/saveMsg",method = POST)
    RequestParam use to bind the info to UI to the Backend server
    public ModelAndView saveMessage(@RequestParam String name, @RequestParam String mobileNum,
                                    @RequestParam String email, @RequestParam String subject, @RequestParam String message) {
        log.info("Name : " + name);
        log.info("Mobile Number : " + mobileNum);
        log.info("Email Address : " + email);
        log.info("Subject : " + subject);
        log.info("Message : " + message);
        return new ModelAndView("redirect:/contact");
    }


    #2 - Method 2 (Creating Service class and Autowiring to automatic inject the dependencies)

    @RequestMapping(value = "/saveMsg",method = POST)
    public ModelAndView(Contact contact){
        contactService.saveMessageDetails(contact);
        return new ModelAndView("redirect:/contact");
    }
    */



}
