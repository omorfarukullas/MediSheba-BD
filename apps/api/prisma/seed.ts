import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting MediSheba BD Database Seeder...');

  // 1. Create Hospitals in Bangladesh
  console.log('🏥 Creating Hospitals...');
  const dmch = await prisma.hospital.upsert({
    where: { email: 'admin@dmch.gov.bd' },
    update: {},
    create: {
      name: 'Dhaka Medical College & Hospital',
      address: 'Secretariat Road, Ramna',
      city: 'Dhaka',
      phone: '+880255165088',
      email: 'admin@dmch.gov.bd',
      type: 'PUBLIC',
      isApproved: true,
      resources: {
        create: [
          { type: 'ICU_BED', totalCount: 40, availableCount: 6, ward: 'Critical Care Block A' },
          { type: 'CCU_BED', totalCount: 30, availableCount: 4, ward: 'Cardiology Block' },
          { type: 'GENERAL_BED', totalCount: 500, availableCount: 82, ward: 'General Medicine' }
        ]
      },
      ambulances: {
        create: [
          { driverName: 'Md. Karim Ullah', phone: '+8801711223344', plateNumber: 'DHA-CHA-1122', type: 'ICU', status: 'AVAILABLE', location: 'Shahbag' },
          { driverName: 'Abdur Rahim', phone: '+8801811223344', plateNumber: 'DHA-CHA-3344', type: 'AC', status: 'AVAILABLE', location: 'Farmgate' }
        ]
      }
    }
  });

  const nicvd = await prisma.hospital.upsert({
    where: { email: 'info@nicvd.gov.bd' },
    update: {},
    create: {
      name: 'National Institute of Cardiovascular Diseases (NICVD)',
      address: 'Sher-e-Bangla Nagar',
      city: 'Dhaka',
      phone: '+88029122560',
      email: 'info@nicvd.gov.bd',
      type: 'PUBLIC',
      isApproved: true,
      resources: {
        create: [
          { type: 'CCU_BED', totalCount: 60, availableCount: 12, ward: 'Coronary Care Unit' },
          { type: 'ICU_BED', totalCount: 25, availableCount: 3, ward: 'Cardiothoracic ICU' }
        ]
      },
      ambulances: {
        create: [
          { driverName: 'Kamal Hossain', phone: '+8801911223344', plateNumber: 'DHA-CHA-5566', type: 'ICU', status: 'AVAILABLE', location: 'Mirpur Road' }
        ]
      }
    }
  });

  const bsmmu = await prisma.hospital.upsert({
    where: { email: 'admin@bsmmu.edu.bd' },
    update: {},
    create: {
      name: 'Bangabandhu Sheikh Mujib Medical University (BSMMU)',
      address: 'Shahbag',
      city: 'Dhaka',
      phone: '+88029661051',
      email: 'admin@bsmmu.edu.bd',
      type: 'PUBLIC',
      isApproved: true,
      resources: {
        create: [
          { type: 'CABIN', totalCount: 80, availableCount: 18, ward: 'Cabin Block C' },
          { type: 'ICU_BED', totalCount: 35, availableCount: 5, ward: 'Central ICU' }
        ]
      }
    }
  });

  // 2. Create Doctors
  console.log('👨‍⚕️ Creating Doctors & Chambers...');
  const docUser1 = await prisma.user.upsert({
    where: { email: 'dr.rafiqul@medisheba.bd' },
    update: {},
    create: {
      firebaseUid: 'uid_doctor_rafiqul_101',
      email: 'dr.rafiqul@medisheba.bd',
      fullName: 'Prof. Dr. Md. Rafiqul Islam',
      role: 'DOCTOR',
      phone: '+8801700112233',
      isVerified: true,
      doctor: {
        create: {
          bmdcNumber: 'A-45912',
          specialization: 'Internal Medicine & Cardiology',
          subSpecialization: 'Hypertension & Diabetes Management',
          experienceYears: 18,
          degrees: ['MBBS', 'FCPS (Medicine)', 'FRCP (Edin)'],
          languages: ['Bengali', 'English'],
          consultationFeePhysical: 800,
          consultationFeeOnline: 600,
          isAvailable: true,
          isTelemedicineEnabled: true,
          rating: 4.9,
          status: 'ACTIVE',
          hospitalId: dmch.id,
          slots: {
            create: [
              { dayOfWeek: 0, startTime: '17:00', endTime: '21:00', slotDuration: 15, consultationType: 'PHYSICAL', maxPatients: 25 },
              { dayOfWeek: 1, startTime: '17:00', endTime: '21:00', slotDuration: 15, consultationType: 'PHYSICAL', maxPatients: 25 },
              { dayOfWeek: 2, startTime: '17:00', endTime: '21:00', slotDuration: 15, consultationType: 'PHYSICAL', maxPatients: 25 }
            ]
          }
        }
      }
    },
    include: { doctor: true }
  });

  const docUser2 = await prisma.user.upsert({
    where: { email: 'dr.farhana@medisheba.bd' },
    update: {},
    create: {
      firebaseUid: 'uid_doctor_farhana_102',
      email: 'dr.farhana@medisheba.bd',
      fullName: 'Dr. Farhana Ahmed',
      role: 'DOCTOR',
      phone: '+8801800112233',
      isVerified: true,
      doctor: {
        create: {
          bmdcNumber: 'A-67210',
          specialization: 'Cardiology',
          subSpecialization: 'Interventional Cardiology',
          experienceYears: 12,
          degrees: ['MBBS', 'MD (Cardiology)'],
          languages: ['Bengali', 'English'],
          consultationFeePhysical: 1000,
          consultationFeeOnline: 800,
          isAvailable: true,
          isTelemedicineEnabled: true,
          rating: 4.8,
          status: 'ACTIVE',
          hospitalId: nicvd.id,
          slots: {
            create: [
              { dayOfWeek: 1, startTime: '10:00', endTime: '14:00', slotDuration: 20, consultationType: 'PHYSICAL', maxPatients: 20 },
              { dayOfWeek: 3, startTime: '10:00', endTime: '14:00', slotDuration: 20, consultationType: 'PHYSICAL', maxPatients: 20 }
            ]
          }
        }
      }
    },
    include: { doctor: true }
  });

  const docUser3 = await prisma.user.upsert({
    where: { email: 'dr.tanvir@medisheba.bd' },
    update: {},
    create: {
      firebaseUid: 'uid_doctor_tanvir_103',
      email: 'dr.tanvir@medisheba.bd',
      fullName: 'Dr. Tanvir Hasan Chowdhury',
      role: 'DOCTOR',
      phone: '+8801900112233',
      isVerified: true,
      doctor: {
        create: {
          bmdcNumber: 'A-51093',
          specialization: 'Orthopedic Surgery',
          subSpecialization: 'Trauma & Joint Replacement',
          experienceYears: 14,
          degrees: ['MBBS', 'MS (Orthopedics)'],
          languages: ['Bengali', 'English'],
          consultationFeePhysical: 900,
          consultationFeeOnline: 700,
          isAvailable: true,
          isTelemedicineEnabled: false,
          rating: 4.7,
          status: 'ACTIVE',
          hospitalId: bsmmu.id
        }
      }
    },
    include: { doctor: true }
  });

  // 3. Create Sample Patients
  console.log('👤 Creating Patients...');
  const patientUser = await prisma.user.upsert({
    where: { email: 'patient.tariq@gmail.com' },
    update: {},
    create: {
      firebaseUid: 'uid_patient_tariq_201',
      email: 'patient.tariq@gmail.com',
      fullName: 'Tariqul Islam',
      role: 'PATIENT',
      phone: '+8801712345678',
      patient: {
        create: {
          bloodGroup: 'B+',
          dateOfBirth: new Date('1994-06-15'),
          height: 175,
          weight: 72,
          bloodPressure: '120/80',
          allergies: ['Penicillin'],
          conditions: ['Seasonal Asthma']
        }
      }
    },
    include: { patient: true }
  });

  // 4. Create Today's Chamber Queue
  if (docUser1.doctor && patientUser.patient) {
    console.log('⏱️ Setting up Chamber Queue for Dr. Rafiqul Islam...');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appt = await prisma.appointment.create({
      data: {
        patientId: patientUser.patient.id,
        doctorId: docUser1.doctor.id,
        appointmentDate: today,
        appointmentTime: '17:30',
        consultationType: 'PHYSICAL',
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        queueNumber: 18,
        reasonForVisit: 'Routine Blood Pressure Checkup & Fatigue',
        payment: {
          create: {
            amount: 800,
            method: 'BKASH',
            senderNumber: '01712345678',
            transactionId: '9J7K2X44M',
            status: 'PAID'
          }
        },
        queue: {
          create: {
            doctorId: docUser1.doctor.id,
            position: 18,
            status: 'WAITING'
          }
        }
      }
    });

    console.log(`✅ Sample appointment created with serial #${appt.queueNumber}`);
  }

  console.log('✨ MediSheba BD Database Seeding Finished Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
