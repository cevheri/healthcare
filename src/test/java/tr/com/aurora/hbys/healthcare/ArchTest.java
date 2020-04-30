package tr.com.aurora.hbys.healthcare;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("tr.com.aurora.hbys.healthcare");

        noClasses()
            .that()
                .resideInAnyPackage("tr.com.aurora.hbys.healthcare.service..")
            .or()
                .resideInAnyPackage("tr.com.aurora.hbys.healthcare.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..tr.com.aurora.hbys.healthcare.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
