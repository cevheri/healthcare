package tr.com.aurora.hbys.healthcare.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class VisitServiceMapperTest {

    private VisitServiceMapper visitServiceMapper;

    @BeforeEach
    public void setUp() {
        visitServiceMapper = new VisitServiceMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(visitServiceMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(visitServiceMapper.fromId(null)).isNull();
    }
}
