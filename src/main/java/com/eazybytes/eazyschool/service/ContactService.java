package com.eazybytes.eazyschool.service;

import com.eazybytes.eazyschool.model.Contact;
import com.eazybytes.eazyschool.repository.ContactRepository;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;
import com.eazybytes.eazyschool.constants.EazySchoolConstants;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.context.annotation.SessionScope;

import java.time.LocalDateTime;
import java.util.*;


@Slf4j
@Service
//@RequestScope
//@SessionScope
@ApplicationScope
@Data
public class ContactService {


    /**
     * Save Contact Details into DB
     * @param contact
     * @return boolean
     */


    //inserting contact repo bean into contactservice

    @Autowired
    public ContactRepository contactRepository;


    public boolean saveMessageDetails(Contact contact){
        //boolean isSaved = true;

        //for jdbc template
        boolean isSaved = false;
        contact.setStatus(EazySchoolConstants.OPEN);
        contact.setCreatedBy(EazySchoolConstants.ANONYMOUS);
        contact.setCreatedAt(LocalDateTime.now());
        int result = contactRepository.saveContactMsg(contact);
        if(result>0) {
            isSaved = true;
        }
        return isSaved;

        //log.info(contact.toString());
        //return isSaved;
    }

    public List<Contact> findMsgsWithOpenStatus(){
        List<Contact> contactMsgs = contactRepository.findMsgsWithStatus(EazySchoolConstants.OPEN);
        return contactMsgs;
    }

    public boolean updateMsgStatus(int contactId, String updatedBy){
        boolean isUpdated = false;
        int result = contactRepository.updateMsgStatus(contactId,EazySchoolConstants.CLOSE, updatedBy);
        if(result>0) {
            isUpdated = true;
        }
        return isUpdated;
    }

    //For web scope
    private int counter = 0;
    public ContactService(){
        System.out.println("Contact Service Bean Initialized");
    }

}
