// src/components/PrivacyPolicyModal.tsx
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text
} from '@chakra-ui/react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Privacy Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="sm">
            <strong>Effective Date:</strong> January 1, 2024<br /><br />
            
            PFGeomatics is committed to protecting your privacy when you visit our website. Here’s how we handle your information:<br /><br />
            
            <strong>Information We Collect</strong><br />
            We do not collect any personal information directly from our visitors. We use Google Analytics to track sessions and analyse traffic on our site. This service collects data related to your device, browser, IP address, network location, and webpage interactions.<br /><br />
            
            <strong>Use of Cookies</strong><br />
            Google Analytics uses "cookies," which are small files placed on your device, to help analyse how users use the site. The information generated by the cookie about your use of the website (including your IP address) will be transmitted to and stored by Google on servers in the United States.<br /><br />
            
            <strong>Data Protection</strong><br />
            We implement a variety of security measures to maintain the safety of your personal information when you visit our website.<br /><br />
            
            <strong>Third-party Links</strong><br />
            Our website may contain links to external sites that are not operated by us. We are not responsible for the content or privacy practices of these other sites.<br /><br />
            
            <strong>Your Consent</strong><br />
            By using our site, you consent to our website's privacy policy.<br /><br />
            
            If you have any questions regarding the privacy practices of PFGeomatics or your dealings with our website, please contact us at <a href="mailto:info@pfgeomatics.co.uk">info@pfgeomatics.co.uk</a>.<br />
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PrivacyPolicyModal;