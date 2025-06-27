import React, { useState } from 'react';
import { CheckCircle, FileText, PenTool, CreditCard, Users, Clock, Award, Star } from 'lucide-react';
import styles from './Procedure.module.scss';
import classNames from 'classnames';

const AdmissionProcedure = () => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [hoveredStep, setHoveredStep] = useState(null);

  const toggleStep = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(step => step !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const steps = [
    {
      icon: FileText,
      title: "Application Form",
      description: "Fill out the online application form with the required details.",
      badge: "Online",
      color: "#ff8c19"
    },
    {
      icon: PenTool,
      title: "Document Submission",
      description: "Submit necessary documents, including birth certificate, report card, and address proof.",
      badge: "Required",
      color: "#ff6a00"
    },
    {
      icon: Award,
      title: "Entrance Exam",
      description: "Schedule and take the entrance exam as per the announced dates.",
      badge: "Scheduled",
      color: "#ffb347"
    },
    {
      icon: CreditCard,
      title: "Fee Payment",
      description: "Complete the fee payment within the stipulated time to secure your admission.",
      badge: "Secure",
      color: "#ff8c19"
    },
    {
      icon: Users,
      title: "Orientation",
      description: "Participate in the orientation session to familiarize yourself with the school.",
      badge: "Welcome",
      color: "#ff6a00"
    }
  ];

  return (
    <div className={styles.procedureContainer}>
      <div className={styles.floatingElements}>
        <div className={styles.floatingIcon}>
          <Star size={20} style={{ color: '#ff8c19' }} />
        </div>
        <div className={styles.floatingIcon} style={{ animationDelay: '1s' }}>
          <Clock size={18} style={{ color: '#ff6a00' }} />
        </div>
      </div>

      <div className={styles.headerSection}>
        <h2 className={styles.title}>Admission Procedure</h2>
        <p className={styles.subtitle}>
          Follow these simple steps to complete your admission process and join our prestigious institution
        </p>

        <div className={styles.progressIndicator}>
          <CheckCircle size={20} style={{ color: '#10b981' }} />
          <span className={styles.progressText}>
            {completedSteps.length} of {steps.length} steps completed
          </span>
        </div>
      </div>

      <ol className={styles.procedureList}>
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isCompleted = completedSteps.includes(index);
          const isHovered = hoveredStep === index;

          return (
            <li
              key={index}
              className={classNames(
                styles.stepItem,
                'fadeInUp',
                {
                  [styles.completed]: isCompleted,
                  [styles.hovered]: isHovered,
                }
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              onClick={() => toggleStep(index)}
            >
              <div className={styles.shimmerEffect} />

              <div className={styles.stepHeader}>
                <div className={classNames(styles.stepNumber, { [styles.completed]: isCompleted })}>
                  {isCompleted ? (
                    <CheckCircle className={styles.stepIcon} />
                  ) : (
                    <IconComponent className={styles.stepIcon} />
                  )}
                </div>

                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    Step {index + 1}: {step.title}
                    <span className={styles.badgeText} style={{
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`
                    }}>
                      <Star size={14} />
                      {step.badge}
                    </span>
                  </h3>

                  <p className={styles.stepDescription}>{step.description}</p>

                  <div className={styles.badgeContainer}>
                    <span className={classNames(styles.statusBadge, {
                      [styles.pending]: !isCompleted,
                      [styles.completed]: isCompleted,
                    })}>
                      {isCompleted ? '✓ Completed' : '⏳ Pending'}
                    </span>

                    <span className={styles.badgeText}>
                      <Clock size={14} />
                      Required Step
                    </span>

                    {index === 0 && (
                      <span className={styles.badgeText} style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                      }}>
                        <FileText size={14} />
                        Age Requirements: 3-14 years
                      </span>
                    )}

                    {index === 2 && (
                      <span className={styles.badgeText} style={{
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)'
                      }}>
                        <Award size={14} />
                        Merit Based
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default AdmissionProcedure;