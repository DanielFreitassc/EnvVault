package com.danielfreitassc.backend.infra.security;

import org.bouncycastle.asn1.x500.X500Name;
import org.bouncycastle.cert.X509v3CertificateBuilder;
import org.bouncycastle.cert.jcajce.JcaX509CertificateConverter;
import org.bouncycastle.cert.jcajce.JcaX509v3CertificateBuilder;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.operator.ContentSigner;
import org.bouncycastle.operator.jcajce.JcaContentSignerBuilder;


import java.io.FileOutputStream;
import java.math.BigInteger;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.KeyStore;
import java.security.Security;
import java.security.cert.X509Certificate;
import java.util.Date;

public class CertificateGenerator {
        public static void generateSelfSignedCertificate(String keystorePath,
                                                        String password,
                                                        String alias,
                                                        String commonName,
                                                        String organization,
                                                        String organizationalUnit,
                                                        String country) throws Exception {
                Security.addProvider(new BouncyCastleProvider());

                KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA", "BC");
                keyPairGenerator.initialize(4096);
                KeyPair keyPair = keyPairGenerator.generateKeyPair();

                X500Name issuerName = new X500Name(
                        "CN=" + commonName + 
                        ", O=" + organization + 
                        ", OU=" + organizationalUnit + 
                        ", C=" + country);

                BigInteger serialNumber = BigInteger.valueOf(System.currentTimeMillis());

                Date startDate = new Date();
                Date endDate = new Date(startDate.getTime() + 365 * 86400000L * 10); // 10 anos

                X509v3CertificateBuilder certBuilder = new JcaX509v3CertificateBuilder(
                        issuerName,
                        serialNumber,
                        startDate,
                        endDate,
                        issuerName,
                        keyPair.getPublic()
                );

                ContentSigner signer = new JcaContentSignerBuilder("SHA512WithRSAEncryption")
                        .setProvider("BC")
                        .build(keyPair.getPrivate());

                X509Certificate cert = new JcaX509CertificateConverter()
                        .setProvider("BC")
                        .getCertificate(certBuilder.build(signer));

                cert.verify(keyPair.getPublic());

                KeyStore keyStore = KeyStore.getInstance("PKCS12", "BC");
                keyStore.load(null, null);
                keyStore.setKeyEntry(
                        alias,
                        keyPair.getPrivate(),
                        password.toCharArray(),
                        new java.security.cert.Certificate[]{cert}
                );

                try (FileOutputStream fos = new FileOutputStream(keystorePath)) {
                keyStore.store(fos, password.toCharArray());
                }
        }

        public static void main(String[] args) {
                try {
                generateSelfSignedCertificate(
                        "src/main/resources/keystore.p12",
                        "sua-senha-segura-123",
                        "springboot-server",
                        "localhost",
                        "Minha Empresa",
                        "TI",
                        "BR"
                );
                System.out.println("Certificado autoassinado gerado com sucesso!");
                } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Erro ao gerar certificado: " + e.getMessage());
                }
        }
}
